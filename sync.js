const fs = require('fs-extra');
const path = require('path');

const localBp = path.join(__dirname, 'bp');
const localRp = path.join(__dirname, 'rp');

const mcBp = 'C:/Users/PC-Lenovo/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/your_behavior_pack_name';
const mcRp = 'C:/Users/PC-Lenovo/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/your_resource_pack_name';

async function syncFolders() {
  try {
    await fs.copy(localBp, mcBp);
    console.log('Behavior Pack synchronized successfully');
    await fs.copy(localRp, mcRp);
    console.log('Resource Pack synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing folders', err);
  }
}

syncFolders();