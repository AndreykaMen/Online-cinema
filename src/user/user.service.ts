import { Injectable } from '@nestjs/common';
import { UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>){}
  async byId(){
    return {email: 'testByID@test.com'}
  }
}
