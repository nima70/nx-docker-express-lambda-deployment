# ./terraform/ecr/ecr.tf
# Define the AWS provider with the specific region where resources will be created
provider "aws" {
  region = "us-east-2" # Choosing the US East (Ohio) region
}
# Create an ECR repository to store Docker images
resource "aws_ecr_repository" "my_ecr_repository" {
  name                 = "terraform-ecr" # Naming the repository "terraform-ecr"
  image_tag_mutability = "MUTABLE"       # Allowing image tags to be overwritten
  # Enabling image scanning on push to identify vulnerabilities
  image_scanning_configuration {
    scan_on_push = true
  }
}