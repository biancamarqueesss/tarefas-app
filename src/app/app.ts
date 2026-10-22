import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Gerenciador de Tarefas</h1>
    <router-outlet />
  `,
  styles: [
    `
      h1 {
        text-align: center;
        margin-top: 1.5rem;
        color: #263238;
      }
    `,
  ],
})
export class App {}
