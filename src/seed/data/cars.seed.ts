import { v4 as uuid } from 'uuid';

export const CARS_SEED: ICarInterface[] = [
  { id: uuid(), model: 'Civic', brand: 'Honda' },
  { id: uuid(), model: 'Corolla', brand: 'Toyota' },
  { id: uuid(), model: 'A3', brand: 'Audi' },
];