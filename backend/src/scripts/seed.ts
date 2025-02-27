import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { CategorySchema } from 'src/categories/category.schema';
import { OrderSchema } from 'src/orders/order.schema';
import { ProductSchema } from 'src/products/product.schema';

dotenv.config();

const CategoryModel = mongoose.model('Category', CategorySchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const OrderModel = mongoose.model('Order', OrderSchema);

async function connectDB() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log('Conectado ao MongoDB');
}

async function clearDB() {
  await mongoose.connection.db?.dropDatabase();
  console.log('Database limpa.');
}

async function seedCategories(): Promise<string[]> {
  const categories = [
    { name: 'Eletrônicos', description: 'Dispositivos eletrônicos' },
    { name: 'Roupas', description: 'Vestuário' },
    { name: 'Livros', description: 'Livros e eBooks' },
  ];

  const createdCategories = await CategoryModel.insertMany(categories);
  console.log(`${createdCategories.length} categorias criadas.`);

  return createdCategories.map((cat) => cat._id.toString());
}

async function seedProducts(categoryIds: string[]): Promise<string[]> {
  const products = Array.from({ length: 20 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    categoryIds: faker.helpers.arrayElements(categoryIds, { min: 1, max: 3 }), // 1-3 categorias
  }));

  const createdProducts = await ProductModel.insertMany(products);
  console.log(`${createdProducts.length} produtos criados.`);

  return createdProducts.map((prod) => prod._id.toString());
}

async function seedOrders(productIds: string[]) {
  const orders = Array.from({ length: 10 }, () => ({
    data: faker.date.recent({ days: 30 }),
    productIds: faker.helpers.arrayElements(productIds, { min: 1, max: 5 }),
  }));

  for (const order of orders) {
    const products = await ProductModel.find({
      _id: { $in: order.productIds },
    });

    if (order && 'total' in order)
      order.total = products.reduce((sum, prod) => sum + prod.price, 0);
  }

  await OrderModel.insertMany(orders);
  console.log(`${orders.length} pedidos criados.`);
}

async function seed() {
  try {
    await connectDB();
    await clearDB();

    const categoryIds = await seedCategories();
    const productIds = await seedProducts(categoryIds);
    await seedOrders(productIds);

    console.log('Seed concluído');
    process.exit();
  } catch (error) {
    console.error('Erro no seed', error);
    process.exit();
  }
}

seed();
