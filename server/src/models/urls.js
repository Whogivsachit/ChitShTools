// Url Shortener Model
module.exports = (sequelize, dataTypes) => {
    const Urls = sequelize.define('Urls', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: dataTypes.STRING,
            allowNull: false
        },
        shortUrl: {
            type: dataTypes.STRING,
            allowNull: false
        },
        creator: {
            type: dataTypes.STRING,
            allowNull: false
        },
        impressions: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'urls',
        timestamps: false
    });

    return Urls;
}