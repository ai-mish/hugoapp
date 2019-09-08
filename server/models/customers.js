module.exports = function(sequelize, Sequalize) {
    var CustomersSchema = sequelize.define("Customers", {
        id: {
          type: Sequalize.INTEGER,
          primaryKey: true
        },
        name: Sequalize.STRING,
        profilepicture: Sequalize.STRING,
        title: Sequalize.STRING,
        recommendation: Sequalize.STRING,
        default_recommendation: Sequalize.STRING
    },{
        timestamps: false
    });
    return CustomersSchema;
}
