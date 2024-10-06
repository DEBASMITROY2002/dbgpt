import os

def split_file(file_path, chunk_size_mb=99):
    # Convert MB to Bytes
    chunk_size = chunk_size_mb * 1024 * 1024
    file_name = os.path.basename(file_path)
    file_dir = os.path.dirname(file_path)
    chunk_dir = os.path.join(file_dir, f"{file_name}_chunks")
    
    # Create directory for chunks if it doesn't exist
    os.makedirs(chunk_dir, exist_ok=True)
    
    with open(file_path, 'rb') as f:
        chunk_number = 0
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            chunk_name = os.path.join(chunk_dir, f"{file_name}.part{chunk_number}")
            with open(chunk_name, 'wb') as chunk_file:
                chunk_file.write(chunk)
            print(f"Created chunk: {chunk_name}")
            chunk_number += 1

    print(f"File split into {chunk_number} chunks in {chunk_dir}")

# Usage Example
split_file("./longformer-base-4096/pytorch_model.bin", chunk_size_mb=99)
