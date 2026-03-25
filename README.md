# Static Website Hosting with AWS S3 + CloudFront using Terraform

This project provides a complete Terraform configuration to host a static website on AWS using S3 for storage and CloudFront CDN for fast, secure content delivery with Origin Access Control (OAC).

## 🌟 What This Project Does

This Terraform code automatically sets up:
- **AWS S3 Bucket** - Stores your website files securely
- **CloudFront Distribution** - Delivers your content globally with low latency
- **Origin Access Control (OAC)** - Ensures only CloudFront can access your S3 bucket (enhanced security)
- **HTTPS Redirect** - Automatically redirects HTTP traffic to HTTPS
- **Bucket Policy** - Configures proper permissions between CloudFront and S3

## 📋 Prerequisites

Before you begin, make sure you have:

1. **AWS Account** - You need an active AWS account
2. **AWS CLI** - Installed and configured with your credentials
   ```bash
   aws configure
   ```
3. **Terraform** - Installed on your machine (version 1.0 or higher)
   - Download from: https://www.terraform.io/downloads

## 🚀 How to Deploy Your Website

### Step 1: Prepare Your Website Files

Place your website files in the `website_source_code` folder:

```
website_source_code/
├── index.html    (Required - Your homepage)
├── error.html    (Required - Error page)
├── style.css     (Your CSS styles)
├── script.js     (Your JavaScript code)
└── (any other files like images, fonts, etc.)
```

**Important:** You MUST have at least `index.html` and `error.html` in this folder.

### Step 2: Configure Variables (Optional)

Edit `variable.tf` if you want to customize:
- **region** - AWS region (default: ap-south-1)
- **bucket_name** - S3 bucket name (must be globally unique)
- **cloudfront-oac-name** - Name for Origin Access Control
- **cloudfront-oac-description** - Description for OAC

### Step 3: Run Terraform Commands

Open your terminal in the project directory and run:

```bash
# Initialize Terraform (downloads required providers)
terraform init

# Preview what will be created
terraform plan

# Create the infrastructure
terraform apply
```

When prompted, type `yes` to confirm.

### Step 4: Access Your Website

After deployment completes, Terraform will output your website URL:

```
url = "d1234567890abc.cloudfront.net"
```

Visit this URL in your browser to see your live website!

## 📁 Project Structure

```
.
├── main.tf              # Main infrastructure configuration
├── providers.tf         # AWS provider configuration
├── variable.tf          # Input variables
├── output.tf            # Output values (website URL)
├── README.md            # This file
└── website_source_code/ # Your website files go here
    ├── index.html
    ├── error.html
    ├── style.css
    └── script.js
```

## 🔧 What Gets Created in AWS

1. **S3 Bucket** - Private bucket with public access blocked
2. **CloudFront Distribution** - CDN with HTTPS enabled
3. **Origin Access Control** - Secure connection between CloudFront and S3
4. **Bucket Policy** - Allows CloudFront to read from S3
5. **S3 Objects** - Your website files uploaded to the bucket

## 💰 Cost Considerations

- **S3 Storage** - Very low cost (typically cents per month)
- **CloudFront** - Free tier includes 1TB data transfer out per month
- **Data Transfer** - Charges apply after free tier limits

## 🔄 Updating Your Website

To update your website content:

1. Modify files in the `website_source_code` folder
2. Run `terraform apply` again
3. Terraform will detect changes and update only modified files

## 🧹 Cleanup

To delete all resources and avoid charges:

```bash
terraform destroy
```

Type `yes` when prompted. This will remove all AWS resources created by this project.

## 🛡️ Security Features

- S3 bucket is private (not publicly accessible)
- CloudFront uses Origin Access Control (OAC) for secure access
- Automatic HTTPS redirect for secure connections
- No direct S3 website hosting (more secure approach)

## 📝 Supported File Types

The configuration automatically sets correct content types for:
- HTML, CSS, JavaScript
- Images (PNG, JPG, JPEG, GIF, SVG)
- JSON files

## ❓ Troubleshooting

**Issue:** Bucket name already exists
- **Solution:** Change `bucket_name` in `variable.tf` to a unique name

**Issue:** Access denied errors
- **Solution:** Ensure AWS CLI is configured with proper credentials

**Issue:** Website shows 403 error
- **Solution:** Make sure `index.html` exists in `website_source_code` folder

**Issue:** Changes not reflecting
- **Solution:** CloudFront caches content. Wait 5-10 minutes or create an invalidation

## 📚 Learn More

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)

## 📄 License

See LICENSE file for details.

---

**Happy Hosting! 🎉** If you have questions, feel free to open an issue.
