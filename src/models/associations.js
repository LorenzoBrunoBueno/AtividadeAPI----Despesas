const UserModel = require('/user')
const CategoryModel = require('/category')
const ExpenseModel = require('./expense')

ExpenseModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    as: 'category'
})

ExpenseModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user' 
})

UserModel.hasMany(ExpenseModel, {
    foreignKey: 'userId',
    as: 'expenses'
})

CategoryModel.hasMany(ExpenseModel, {
    foreignKey: 'categoryId',
    as: 'expenses'
})