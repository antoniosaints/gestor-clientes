<template>
  <div class="flex justify-between space-x-4">
    <Avatar>
      <AvatarImage :src="`https://i.pravatar.cc/150?u=${usuario.email}`" />
      <AvatarFallback>{{ usuario.nome.split(' ').map(n => n[0]).join('') }}</AvatarFallback>
    </Avatar>
    <div class="space-y-1">
      <h4 class="text-sm font-semibold">{{ usuario.nome }}</h4>
      <p class="text-sm text-muted-foreground flex items-center">
        <Mail class="h-3 w-3 mr-1" />
        {{ usuario.email }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Phone class="h-3 w-3 mr-1" />
        {{ usuario.telefone }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ShieldMinus class="h-3 w-3 mr-1" />
        {{ usuario.regra.substring(0, 1).toUpperCase() + usuario.regra.substring(1) }}
      </p>
      <div class="flex items-center pt-2">
        <span class="text-xs text-muted-foreground">
          Último login: {{ usuario.dataCriacao }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { Mail, Phone, ShieldMinus } from "lucide-vue-next";

defineProps<{
    usuario: IUsuario
}>();

</script>