import { Injectable, signal } from '@angular/core';
import { Tarefa } from './tarefa';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private tarefas = signal<Tarefa[]>([]);
  private proximoId = 1;

  /** Retorna todas as tarefas cadastradas (lê o signal, então é reativo no template). */
  listar(): Tarefa[] {
    return this.tarefas();
  }

  /** Adiciona uma nova tarefa em memória. */
  adicionar(titulo: string, prazo: string): void {
    const nova: Tarefa = {
      id: this.proximoId++,
      titulo: titulo.trim(),
      prazo,
      concluida: false,
      removida: false,
    };
    this.tarefas.update((lista) => [...lista, nova]);
  }

  /** "Remove" a tarefa: ela continua na lista, mas marcada como removida (vermelha). */
  remover(id: number): void {
    this.tarefas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, removida: true } : t))
    );
  }

  /**
   * Prazo de conclusão: retorna quantos dias faltam para o prazo da tarefa.
   * Valor negativo = atrasada; null = tarefa sem prazo.
   */
  prazoConclusao(id: number): number | null {
    const tarefa = this.tarefas().find((t) => t.id === id);
    if (!tarefa || !tarefa.prazo) {
      return null;
    }
    const [ano, mes, dia] = tarefa.prazo.split('-').map(Number);
    const prazo = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.round((prazo.getTime() - hoje.getTime()) / msPorDia);
  }

  /** Marca a tarefa como concluída (aparece sublinhada). */
  marcarConcluida(id: number): void {
    this.tarefas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, concluida: true } : t))
    );
  }
}
