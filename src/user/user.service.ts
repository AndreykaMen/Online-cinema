import { Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {
  }

  async byId(_id: string) {
    const user = await this.userModel.findById(_id);

    if (!user) throw new NotFoundException("User not found");
    return user;
    //Либо можно возвращать выбранные поля из user
    // return {
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   favorites: user.favorites,
    //   createdAt: user.createdAt
    // }
  }

  async updateProfile(_id: string), dto: UpdateUserDto){

  }
}
