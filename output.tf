output "url" {
  value =  aws_cloudfront_distribution.website_distribution.domain_name
  description = "URL of the static website"
}