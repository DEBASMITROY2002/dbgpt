import os

def merge_chunks(chunk_dir, output_file):
    # Ensure the chunks are read in the correct order
    chunk_files = sorted(os.listdir(chunk_dir), key=lambda x: int(x.split('part')[-1]))
    
    with open(output_file, 'wb') as output_f:
        for chunk_file_name in chunk_files:
            chunk_file_path = os.path.join(chunk_dir, chunk_file_name)
            with open(chunk_file_path, 'rb') as chunk_f:
                output_f.write(chunk_f.read())
            print(f"Merged chunk: {chunk_file_path}")
    
    print(f"File merged into {output_file}")

# Usage Example
merge_chunks("./longformer-base-4096/pytorch_model.bin_chunks", "./longformer-base-4096/pytorch_model.bin_chunks")
