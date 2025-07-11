const Generator = require('yeoman-generator').default;

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      // ชื่อ service
      {
        type: 'input',
        name: 'name',
        message: 'Service name:',
        default: 'auth-service'
      },
      // พอร์ต
      {
        type: 'input',
        name: 'port',
        message: 'Port to run on:',
        default: '3000'
      },
      // Database config
      {
        type: 'input',
        name: 'dbHost',
        message: 'DB_HOST:',
        default: 'localhost'
      },
      {
        type: 'input',
        name: 'dbPort',
        message: 'DB_PORT:',
        default: '5432'
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'DB_NAME:',
        default: 'authen_db'
      },
      {
        type: 'input',
        name: 'dbUser',
        message: 'DB_USER:',
        default: 'postgres'
      },
      {
        type: 'password',
        name: 'dbPass',
        message: 'DB_PASSWORD:',
        default: 'password'
      },
      // Additional settings
      {
        type: 'input',
        name: 'apiKey',
        message: 'API_KEY:',
        default: ''
      },
      {
        type: 'input',
        name: 'jwtSecret',
        message: 'JWT_SECRET_KEY:',
        default: 'your_jwt_secret'
      },
      {
        type: 'input',
        name: 'secretKey',
        message: 'SECRET_KEY:',
        default: 'your_secret_key'
      },
      {
        type: 'input',
        name: 'tokenExpiration',
        message: 'TOKEN_EXPIRATION_MINUTES:',
        default: '60'
      },
      {
        type: 'input',
        name: 'connectTimeout',
        message: 'CONNECTION_TIMEOUT (ms):',
        default: '5000'
      },
      {
        type: 'input',
        name: 'readTimeout',
        message: 'READ_TIMEOUT (ms):',
        default: '5000'
      },
      {
        type: 'input',
        name: 'algorithm',
        message: 'ALGORITHM:',
        default: 'HS256'
      },
      {
        type: 'list',
        name: 'logLevel',
        message: 'LOG_LEVEL:',
        choices: ['debug', 'info', 'warn', 'error'],
        default: 'info'
      }
    ]);
  }

  writing() {
  const { name } = this.answers;
  const targetDir = this.destinationPath(name);

  // 1) คัดลอกทุกอย่างจาก templates, inject this.answers
  //    แล้ว strip .hbs ออกจากชื่อไฟล์อัตโนมัติ
  this.fs.copyTpl(
    this.templatePath('**/*'),
    targetDir,
    this.answers,
    /* templateOptions */ null,
    {
      globOptions: {
        dot: true,
        ignore: ['**/node_modules/**', '**/*.lock']
      },
      // ตรงนี้ใช้ processDestinationPath เพื่อเปลี่ยนชื่อไฟล์ก่อนเขียนลง disk
      processDestinationPath: filePath => {
        // ถ้าไฟล์ลงท้าย .hbs ให้ตัดทิ้ง
        return filePath.endsWith('.hbs')
          ? filePath.replace(/\.hbs$/, '')
          : filePath;
      }
    }
  );

  // 2) คัดลอก .env.example → .env จากโฟลเดอร์ templates
  this.fs.copy(
    this.templatePath('.env.example'),
    this.destinationPath(name, '.env')
  );
},

install() {
  const targetDir = this.destinationPath(this.answers.name);
  this.log(`Installing Python deps in ${name}…`);

  // ถ้าเป็น Node โปรเจค ให้ใช้ npm install
  // this.spawnCommandSync('npm', ['install'], { cwd: targetDir });

  // แต่ถ้าเป็น Python โปรเจค ให้ใช้ pip install -r requirements.txt
  this.spawnCommandSync('pip', ['install', '-r', 'requirements.txt'], { cwd: targetDir });
}
};
