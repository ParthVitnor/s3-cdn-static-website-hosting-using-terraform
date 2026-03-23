variable "region" {
    default = "ap-south-1"
}


variable "bucket_name" {
   default = "static-website-hosting-bucket"
}


variable "cloudfront-oac-name" {
    default = "OAC-static-web-hosting"
}


variable "cloudfront-oac-description" {
    default = "OAC for S3 bucket"
}