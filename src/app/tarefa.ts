export interface Tarefa {
  id: number;
  titulo: string;
  prazo: string; // formato AAAA-MM-DD
  concluida: boolean;
  removida: boolean;
}
