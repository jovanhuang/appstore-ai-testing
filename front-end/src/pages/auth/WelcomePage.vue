<template>
  <q-page padding>
    <!-- content -->
    <main class="row justify-center items-center">
      <section class="col-5">
        <q-card tag="form" class="bg-surface">
          <q-card-section>
            <div class="text-h5">Login</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-btn
                icon="login"
                label="Log in"
                type="submit"
                color="primary"
                padding="sm xl"
                unelevated
                rounded
                no-caps
              ></q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
import { Ref, ref } from 'vue';
import KeyCloakService from 'src/security/KeycloakService';
const userId: Ref<string | null> = ref(null);
const password: Ref<string | null> = ref(null);
const authStore = useAuthStore();

const onSubmit = async () => {
  KeyCloakService.CallLogin(); 
};
</script>
