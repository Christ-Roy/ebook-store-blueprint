const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
  }

  // Créer un transporteur Nodemailer
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // En production, utilisez un service réel (SendGrid, Mailgun, etc.)
      return nodemailer.createTransport({
        service: 'SendGrid', // Remplacer par votre service d'emails
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    // En développement, utilisez Mailtrap ou le service SMTP configuré
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Envoyer l'email
  async send(template, subject, content) {
    // 1) Définir les options de l'email
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: this.generateTemplate(template, content),
    };

    // 2) Créer un transporteur et envoyer l'email
    await this.newTransport().sendMail(mailOptions);
  }

  // Générer le template d'email
  generateTemplate(template, content) {
    switch (template) {
      case 'welcome':
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Bienvenue sur Ebook Store, ${this.firstName}!</h2>
            <p>Nous sommes ravis de vous compter parmi nos membres.</p>
            <p>Vous pouvez maintenant explorer notre catalogue d'ebooks et commencer à enrichir vos connaissances.</p>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Bonne lecture!</p>
            <p>L'équipe Ebook Store</p>
          </div>
        `;

      case 'download':
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Votre ebook est prêt à être téléchargé, ${this.firstName}!</h2>
            <p>Merci pour votre achat de <strong>${content.bookTitle}</strong>.</p>
            <p>Vous pouvez télécharger votre ebook en cliquant sur le lien ci-dessous :</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${this.url}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Télécharger mon ebook
              </a>
            </p>
            <p><strong>Important :</strong></p>
            <ul>
              <li>Ce lien est valable pour 48 heures, jusqu'au ${content.expiryDate}</li>
              <li>Vous pouvez télécharger l'ebook jusqu'à ${content.maxDownloads} fois</li>
              <li>Ce lien est personnel, merci de ne pas le partager</li>
            </ul>
            <p>Nous vous souhaitons une excellente lecture!</p>
            <p>L'équipe Ebook Store</p>
          </div>
        `;

      case 'password-reset':
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Réinitialisation de votre mot de passe</h2>
            <p>Bonjour ${this.firstName},</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${this.url}" style="background-color: #2196F3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Réinitialiser mon mot de passe
              </a>
            </p>
            <p>Ce lien expirera dans 10 minutes.</p>
            <p>Si vous n'avez pas demandé la réinitialisation de votre mot de passe, veuillez ignorer cet email.</p>
            <p>L'équipe Ebook Store</p>
          </div>
        `;

      case 'order-confirmation':
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Confirmation de votre commande</h2>
            <p>Bonjour ${this.firstName},</p>
            <p>Nous vous confirmons la réception de votre commande n°${content.orderId}.</p>
            <h3>Récapitulatif de votre commande :</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Produit</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Prix</th>
              </tr>
              ${content.items.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.title}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.price.toFixed(2)} €</td>
                </tr>
              `).join('')}
              <tr style="font-weight: bold;">
                <td style="padding: 10px; border: 1px solid #ddd;">Total</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${content.total.toFixed(2)} €</td>
              </tr>
            </table>
            <p>Vous recevrez prochainement un email contenant les liens de téléchargement pour vos ebooks.</p>
            <p>Merci pour votre confiance!</p>
            <p>L'équipe Ebook Store</p>
          </div>
        `;

      default:
        return content;
    }
  }

  // Email de bienvenue
  async sendWelcome() {
    await this.send(
      'welcome',
      'Bienvenue sur Ebook Store!'
    );
  }

  // Email de téléchargement
  async sendDownloadLink(downloadInfo) {
    await this.send(
      'download',
      `Votre ebook "${downloadInfo.bookTitle}" est prêt à télécharger`,
      downloadInfo
    );
  }

  // Email de réinitialisation de mot de passe
  async sendPasswordReset() {
    await this.send(
      'password-reset',
      'Votre lien de réinitialisation de mot de passe (valable 10 minutes)'
    );
  }

  // Email de confirmation de commande
  async sendOrderConfirmation(orderInfo) {
    await this.send(
      'order-confirmation',
      `Confirmation de votre commande #${orderInfo.orderId}`,
      orderInfo
    );
  }
}

module.exports = Email;