import { Menu } from './pl/Menu';
import * as fs from 'fs';

class Program {
    static async main(): Promise<void> {
        try {
            // Create directory for files
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const menu = new Menu();
            await menu.mainMenu();
        } catch (error) {
            console.error('Critical program error:', error);
            process.exit(1);
        }
    }
}

// Run the program
if (require.main === module) {
    Program.main().catch(console.error);
}