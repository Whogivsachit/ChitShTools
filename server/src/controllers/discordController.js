const { Webhook, MessageBuilder } = require('discord-webhook-node');

exports.sendWebhook = async (req, res) => {
    try {
        const { webhook, webhookUrl, contentOnly } = req.body;
        const { content, profile, profileIcon, profileUrl, author, authorIcon, title, description, url, color, thumbnail, image, footer, footerIcon, timestamp, fields } = webhook;
        
        console.log(req.body)

        const embed = new MessageBuilder()
        .setText(content)
        .setTitle(title)
        .setDescription(description)
        .setURL(url)
        .setColor(color)
        .setThumbnail(thumbnail)
        .setImage(image)
        .setAuthor(profile, profileIcon, profileUrl)
        .setFooter(footer, footerIcon)
        .setTimestamp(timestamp);
        if(fields) { fields.forEach(({ name, value }) => embed.addField(name, value)); }
        
        const hook = new Webhook(webhookUrl);
        hook.setUsername(author);
        hook.setAvatar(authorIcon);


        contentOnly ? await hook.send(content) : await hook.send(embed);
        res.send({status: 200, response: 'Successfuly sent webhook!'});
    } catch (error) {
        console.log(error)
        res.send({status: 500, response: 'An error occured while sending webhook!'});
    }

}