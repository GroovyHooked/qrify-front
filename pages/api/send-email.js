import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { to, subject, text } = req.body;

        try {

            // Configure le transporteur SMTP
            const transporter = nodemailer.createTransport({
                service: 'Yahoo',
                port: 587,
                secure: false,
                auth: {
                    user: 'dafrenchie2002@yahoo.fr',
                    pass: 'dppmwnoenmqgzrse',
                },
            });

            // Options de l'email
            var mailOptions = {
                from: 'dafrenchie2002@yahoo.fr',
                to,
                subject,
                text
            };

            // Envoi l'email
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Email envoyé avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Méthode ${req.method} non autorisée.` });
    }
}


// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "linda.schulist54@ethereal.email",
//         pass: "gQjVBV29hVXABZ95yR",
//     },
//     // pass: "dppmwnoenmqgzrse",
//     // user: "dafrenchie2002@yahoo.fr"
// });