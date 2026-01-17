import os
import uuid
import re

folder_path = '/home/gokulv/code/startlake/img'

def natural_key(string):
    """
    Splits string into a list of integers and strings.
    E.g. "1 - abc.jpeg" -> [1, " - abc.jpeg"]
    "10 - abc.jpeg" -> [10, " - abc.jpeg"]
    Helps in sorting ["1 - ...", "2 - ...", "10 - ..."] as 1, 2, 10.
    """
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split(r'(\d+)', string)]

# Get all files
files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
files.sort(key=natural_key)

print(f"Found {len(files)} files to rename.")

# First pass: Rename to temporary random names to avoid collisions and track order
temp_files = []
for filename in files:
    _, ext = os.path.splitext(filename)
    
    unique_name = f"temp_{uuid.uuid4()}{ext}"
    
    src = os.path.join(folder_path, filename)
    dst = os.path.join(folder_path, unique_name)
    
    os.rename(src, dst)
    temp_files.append(unique_name)

# Second pass: Rename to final numbered names from 0 to n
for i, temp_filename in enumerate(temp_files, start=0):
    _, ext = os.path.splitext(temp_filename)
    new_name = f"{i}{ext}"
    
    src = os.path.join(folder_path, temp_filename)
    dst = os.path.join(folder_path, new_name)
    
    os.rename(src, dst)
    print(f"Renamed: {temp_filename} (was {files[i]}) -> {new_name}")

print("Renaming complete.")
