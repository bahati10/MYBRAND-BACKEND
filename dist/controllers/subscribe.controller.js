import { Subscriber, SubscribeschemaValidate } from '../models/subscribe.model.js';
import sendNewsletter from '../utils/nodemail.js';
class subscribeController {
    createSubscribers = async (req, res, next) => {
        const email = req.body.email;
        try {
            const { error, value } = SubscribeschemaValidate.validate({ email: email });
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            const existingSubscriber = await Subscriber.findOne({ email: value.email });
            if (existingSubscriber) {
                return res.status(400).json({ message: 'Email already subscribed. Check your email for the welcome newsletter.' });
            }
            const newSubscriber = new Subscriber({ email });
            const savedSubscriber = await newSubscriber.save();
            // Send a welcome newsletter
            const welcomeSubject = 'Welcome to Our Newsletter!';
            const welcomeContent = `
                <p>Dear Subscriber,</p>
                <p>Thank you for subscribing to our newsletter!</p>
                <p>We're thrilled to have you on board. Here's what you can expect:</p>
                <ul>
                    <li>Exciting updates about our products/services</li>
                    <li>Exclusive content and offers just for you</li>
                    <li>Valuable insights and tips to enhance your experience</li>
                </ul>
                <p>We promise to keep your inbox interesting and relevant. If you ever have any questions or feedback, feel free to reach out to us at [your contact email].</p>
                <p>Get ready to stay informed and inspired!</p>
                <p>Best regards,</p>
            `;
            sendNewsletter(email, welcomeSubject, welcomeContent);
            res.status(201).json({ message: 'Subscription successful! Check your email for a welcome newsletter.' });
        }
        catch (error) {
            res.status(500).json({ message: "Error creating subscription" });
            next(error);
        }
    };
    // Get all subscribers
    async getSubs(req, res) {
        try {
            const subs = await Subscriber.find({});
            res.status(200).json({ message: "Subscribers retrieved successfully", subscribers: subs });
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving subscribers" });
        }
    }
    // Get a single subscriber by ID
    async getSub(req, res) {
        const id = req.params.id;
        try {
            const sub = await Subscriber.findById(id);
            if (!sub) {
                return res.status(404).json({ message: "Subscriber not found" });
            }
            res.status(200).json({ message: "Subscriber retrieved successfully", subscriber: sub });
        }
        catch (error) {
            console.error("Error retrieving subscriber:", error);
            res.status(500).json({ message: "Error retrieving subscriber" });
        }
    }
    // Delete a subscriber by ID
    async deleteSub(req, res) {
        const id = req.params.id;
        try {
            const deletedSub = await Subscriber.findByIdAndDelete(id);
            if (!deletedSub) {
                return res.status(404).json({ message: "Subscriber not found" });
            }
            res.status(200).json({ message: "Subscriber deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting subscriber:", error);
            res.status(500).json({ message: "Error deleting subscriber" });
        }
    }
}
export const SubscribeController = new subscribeController();
