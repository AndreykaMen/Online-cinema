import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { genSalt, hash } from "bcryptjs";
import { GenreModel } from "./genre.model";
import { CreateGenreDto } from "./dto/create-genre.dto";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
  ) {
  }

  async bySlug(slug: string) {
    return this.GenreModel.findOne({ slug }).exec();
  }

  async getAll(searchTerm: string) {
    let options = {};
    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, "i")
          },
          {
            slug: new RegExp(searchTerm, "i")
          },
          {
            description: new RegExp(searchTerm, "i")
          }
        ]
      };
    }
    return this.GenreModel.find(options)
      .select("-updatedAt -__v")
      .sort({
        createdAt: "desc"
      })
      .exec();
  }

  async getCollections() {
    // @ts-ignore
    const genres = await this.getAll();
    const collections = genres;
    return collections;
  }

  /* Admin place */

  async byId(_id: string) {
    const genre = await this.GenreModel.findById(_id);

    if (!genre) throw new NotFoundException("Genre not found");
    return genre;
  }


  async create(_id: string, dto: CreateGenreDto) {
    let defaultValue: CreateGenreDto = {
      name: "",
      slug: "",
      description: "",
      icon: ""
    };
    const genre = await this.GenreModel.create(defaultValue);
    return genre._id;
  }

  async update(_id: string, dto: CreateGenreDto) {
    return this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true
    }).exec();
  }

  async delete(id: string) {
    return this.GenreModel.findByIdAndDelete(id).exec();
  }
}
