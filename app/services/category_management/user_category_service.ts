import Category from "#models/category";
import User from "#models/user";

export class UserCategoriesService {
    // Attach User Categories
    static async create(category_ids: number[], user_id: number) {
        const valid_user = await User.find(user_id);
        if(!valid_user) {return {error: {status:404, message:'User not found!'}}};
        if(valid_user.deleted_by !==null) {return {error: {status:404, message:'User is inactive, please contact administrator!'}}};
        for (const category_id of category_ids) {
            const valid_category = await Category.find(category_id);
            if(!valid_category)  {return {error: {status:404, message:'Category not found!'}}};
            if(valid_category.deleted_by !== null) {return {error: {status:404, message:'Category is inactive, please contact administrator!'}}}
        }
        await valid_user.related('category').attach(category_ids);
        return {message: 'User categories added.'};
    }

    // Detach User All Categories
    static async removeAll(user_id: number) {
        const valid_user = await User.find(user_id);
        if(!valid_user) {return {error: {status:404, message:'User not found!'}}};
        if(valid_user.deleted_by !==null) {return {error: {status:404, message:'User is inactive, please contact administrator!'}}};
        await valid_user.related('category').detach();
        return {message: 'All user categories removed.'};
    }

    // Detach User Specific Categories
    static async remove(category_ids: number[], user_id: number) {
        const valid_user = await User.find(user_id);
        if(!valid_user) {return {error: {status:404, message:'User not found!'}}};
        if(valid_user.deleted_by !==null) {return {error: {status:404, message:'User is inactive, please contact administrator!'}}};
        for (const category_id of category_ids) {
            const valid_category = await Category.find(category_id);
            if(!valid_category)  {return {error: {status:404, message:'Category not found!'}}};
            if(valid_category.deleted_by !== null) {return {error: {status:404, message:'Category is inactive, please contact administrator!'}}}
        }
        await valid_user.related('category').detach(category_ids);
        return {message: 'User categories removed.'};
    }

    static async list(user_id: number) {
        const valid_user = await User.find(user_id);
        if(!valid_user) {return {error: {status:404, message:'User not found!'}}};
        if(valid_user.deleted_by !==null) {return {error: {status:404, message:'User is inactive, please contact administrator!'}}};
        const user_categories = await valid_user.load('category');
        console.log(user_categories)
        return user_categories;
    }
}