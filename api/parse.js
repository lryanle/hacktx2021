import { promises as fs } from 'fs';
import { join } from 'path';
import { cwd } from 'process'

async function main() {
    const content = await fs.readFile(join(cwd(), 'data', 'fbd_us_with_satellite_dec2020_v1.csv'))
    console.log(content)
}

main();