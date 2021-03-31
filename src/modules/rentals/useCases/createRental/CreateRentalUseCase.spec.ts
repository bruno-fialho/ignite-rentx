import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open rental to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "teste",
        car_id: "111",
        expected_return_date: new Date(),
      });
      await createRentalUseCase.execute({
        user_id: "teste",
        car_id: "222",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open rental to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1010",
        car_id: "teste",
        expected_return_date: new Date(),
      });
      await createRentalUseCase.execute({
        user_id: "2020",
        car_id: "teste",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});