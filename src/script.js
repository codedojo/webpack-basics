import Greeter from './greeter';
import styles from './app.css';
import logo from './webpack.png';

console.log(logo);

const greeter = new Greeter();

const img = document.createElement('img');
img.src = logo;
img.className = styles.logo;

const h1 = document.createElement('h1');
h1.className = styles.title;
h1.textContent = 'Знакомство с Webpack';

document.body.appendChild(img);
document.body.appendChild(h1);