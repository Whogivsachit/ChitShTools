// QrCode Model
module.exports = (sequelize, dataTypes) => {
    const qrCodes = sequelize.define('qrCodes', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: dataTypes.STRING,
            allowNull: false
        },
        qrCode: {
            type: dataTypes.TEXT('long'),
            allowNull: false
        },
        theme: {
            type: dataTypes.JSON,
            allowNull: false,
        },
        creator: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'qrcodes',
        timestamps: false
    });

    return qrCodes;
}