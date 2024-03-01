# ./express/Dockerfile
FROM public.ecr.aws/lambda/nodejs

# Set the working directory to /var/task
WORKDIR /var/task

# Copy the built project to the workdir
COPY ./dist/express/. /var/task

# You can use the CMD to call the AWS Lambda Node.js runtime to start your function
# This CMD will be overridden by the handler specified in the Lambda console or via the AWS CLI
CMD ["main.handler"] 