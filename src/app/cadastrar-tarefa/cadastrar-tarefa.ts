import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastrar-tarefa.html',
  styleUrl: './cadastrar-tarefa.css',
})
export class CadastrarTarefa {
  private service = inject(TarefaService);

  titulo = '';
  prazo = '';
  mensagem = '';

  cadastrar(): void {
    if (!this.titulo.trim()) {
      return;
    }
    this.service.adicionar(this.titulo, this.prazo);
    this.titulo = '';
    this.prazo = '';
    this.mensagem = 'Tarefa cadastrada com sucesso!';
  }
}
