const dayjs = require('dayjs');
const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client;
}

async function sendReportToNestJs(report) {
  const nestJsEndpoint = process.env.NESTJS_ENDPOINT;

  try {
  } catch (error) {
    console.error('Error on sending report to backend: ', error);
    throw error;
  }
}

exports.dailyReport = async (event) => {
  let client;
  console.log('Iniciando geração do relatório diário de pedidos');

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.DB_NAME);

    const today = dayjs().startOf('day');
    const tomorrow = today.add(1, 'day');

    const todaysOrders = await db
      .collection('orders')
      .find({
        date: {
          $gte: today.toDate(),
          $lt: tomorrow.toDate(),
        },
      })
      .toArray();

    const totalSales = todaysOrders.reduce(
      (sum, order) => (sum += order.total),
      0,
    );
    const orderCount = todaysOrders.length;
    const averageOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

    const report = {
      date: today.format('DD/MM/YYYY'),
      orderCount,
      totalSales,
      averageOrderValue,
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Relatório gerado com sucesso' }),
    };
  } catch (error) {
    console.error('Erro na geração do relatório:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao gerar relatório' }),
    };
  }
};
