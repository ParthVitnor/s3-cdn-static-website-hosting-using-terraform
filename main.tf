resource "aws_s3_bucket" "website_bucket"{
    bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
    bucket = aws_s3_bucket.website_bucket.id

    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "OAC" {
    name = var.cloudfront-oac-name
    description = var.cloudfront-oac-description
    origin_access_control_origin_type = "s3"     
    signing_behavior = "always"
    signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "website_distribution" {
    origin {
        domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
        origin_id = "S3-${aws_s3_bucket.website_bucket.id}"
        origin_access_control_id = aws_cloudfront_origin_access_control.OAC.id
    }

    enabled = true
    is_ipv6_enabled = true

    default_cache_behavior {
        target_origin_id = "S3-${aws_s3_bucket.website_bucket.id}"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods = ["GET", "HEAD"]
        cached_methods = ["GET", "HEAD"]
    }

    default_root_object = "index.html"

    viewer_certificate {
        cloudfront_default_certificate = true
    }
    
  restrictions {
    geo_restriction {
      restriction_type = "None"
    }
  }
}