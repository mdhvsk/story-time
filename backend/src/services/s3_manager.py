import base64

import boto3
import logging
from botocore.exceptions import ClientError


class S3Manager:

    def __init__(self):
        self.s3_client = boto3.client('s3')

    def upload_to_s3(self, file_name, bucket_name, object_name=None):
        try:
            self.s3_client.upload_file(file_name, bucket_name, object_name)
            return "Image uploaded successfully"
        except Exception as e:
            return f"Error uploading image: {e}"

    def retrieve_from_s3(self, bucket_name, object_name):
        try:
            response = self.s3_client.get_object(Bucket=bucket_name, Key=object_name)
            image_bytes = response['Body'].read()

            # Convert bytes back to base64 string if needed
            base64_image_string = base64.b64encode(image_bytes).decode('utf-8')
            return base64_image_string
        except Exception as e:
            print(f"Error retrieving image: {e}")
            return None
        

    def create_presigned_url(self, bucket_name, object_name):
            try:
                response = self.s3_client.generate_presigned_url('get_object',
                                                            Params={'Bucket': bucket_name,
                                                                    'Key': object_name},
                                                            ExpiresIn=3600)
            except ClientError as e:
                logging.error(e)
                return None
    
            # The response contains the presigned URL
            return response