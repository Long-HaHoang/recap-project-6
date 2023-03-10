import { v4 as uuidv4 } from "uuid";
import mongoose, { model, models, Schema } from "mongoose";

const URI = `mongodb+srv://Viper6389:${process.env.MONGODB_PASSWORD}@cluster0.iph03jw.mongodb.net/test?retryWrites=true&w=majority`;

const placeSchema = new Schema(
  {
    id: String,
    location: String,
    image: String,
    mapURL: String,
    description: String,
    name: String,
  },
  {
    collection: "attractions",
  }
);

const Place = models.Place || model("Place", placeSchema);

async function connectDatabase() {
  await mongoose.connect(URI);
}

async function getAllPlaces() {
  await connectDatabase();

  const places = await Place.find({});

  return places;
}

async function getPlace(id) {
  await connectDatabase();
  const place = await Place.findOne({ id });
  return place;
}

async function createPlace(place) {
  await connectDatabase();

  const createdPlace = await Place.create({
    ...place,
    id: uuidv4(),
  });
  return createdPlace;
}

async function deletePlace(id) {
  await connectDatabase();
  const deletedPlace = getPlace(id);
  await Place.deleteOne({ id });
  return deletedPlace;
}

async function updatePlace(id, place) {
  await connectDatabase();

  await Place.updateOne({ id }, place);

  const updatedPlace = getPlace(id);

  return updatedPlace;
}

export { getAllPlaces, getPlace, createPlace, deletePlace, updatePlace };
