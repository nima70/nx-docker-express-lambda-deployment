import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context, APIGatewayEvent } from 'aws-lambda';

// Create an Express application
const app = express();

// Middleware to modify the request path when running on AWS Lambda
app.use((req, res, next) => {
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    // When running on AWS Lambda, strip the leading /default.
    req.url = req.url.replace(/^\/default/, '');
  }
  next();
});

// Define your routes as normal
app.get('/api', (req, res) => {
  res.json({ message: 'api is called' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Express!' });
});

// AWS Lambda server setup
const server = awsServerlessExpress.createServer(app);

// Lambda handler
export const handler = (event: APIGatewayEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};

// Local server setup
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });
}
