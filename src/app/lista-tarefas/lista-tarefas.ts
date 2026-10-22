import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-lista-tarefas',
  imports: [RouterLink, DatePipe],
  templateUrl: './lista-tarefas.html',
  styleUrl: './lista-tarefas.css',
})
export class ListaTarefas {
  service = inject(TarefaService);

  get tarefas() {
    return this.service.listar();
  }

  get total(): number {
    return this.tarefas.length;
  }

  get concluidas(): number {
    return this.tarefas.filter((t) => t.concluida).length;
  }

  /** Pendentes: ainda não concluídas e não removidas. */
  get pendentes(): number {
    return this.tarefas.filter((t) => !t.concluida && !t.removida).length;
  }

  textoPrazo(id: number): string {
    const dias = this.service.prazoConclusao(id);
    if (dias === null) {
      return 'Sem prazo';
    }
    if (dias < 0) {
      return `Atrasada há ${-dias} dia(s)`;
    }
    if (dias === 0) {
      return 'Vence hoje';
    }
    return `Faltam ${dias} dia(s)`;
  }
}
