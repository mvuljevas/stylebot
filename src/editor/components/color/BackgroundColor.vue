<template>
  <b-row align-content="center" no-gutters>
    <css-property>{{ t('background_color') }}</css-property>

    <css-property-value>
      <b-row no-gutters>
        <b-col cols="3">
          <color-picker
            :value="value"
            :disabled="disabled"
            @input="colorSelection"
          />
        </b-col>

        <b-col cols="7" class="pl-2">
          <b-form-input
            v-model="value"
            size="sm"
            :debounce="150"
            :disabled="disabled"
            @focus="focus"
          />
        </b-col>
      </b-row>
    </css-property-value>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Declaration } from 'postcss';

import ColorPicker from './ColorPicker.vue';
import CssProperty from '../CssProperty.vue';
import CssPropertyValue from '../CssPropertyValue.vue';

export default Vue.extend({
  name: 'BackgroundColor',

  components: {
    ColorPicker,
    CssProperty,
    CssPropertyValue,
  },

  computed: {
    value: {
      get(): string {
        const activeRule = this.$store.getters.activeRule;

        let value = '';
        if (activeRule) {
          activeRule
            .clone()
            .walkDecls('background-color', (decl: Declaration) => {
              value = decl.value;
            });
        }

        return value;
      },

      set(value: string): void {
        this.$store.dispatch('applyDeclaration', {
          property: 'background-color',
          value,
        });
      },
    },

    disabled(): boolean {
      return !this.$store.state.activeSelector;
    },
  },

  methods: {
    colorSelection(color: { hex: string }): void {
      this.$store.dispatch('applyDeclaration', {
        property: 'background-color',
        value: color.hex,
      });
    },

    focus(event: FocusEvent): void {
      (event.target as HTMLInputElement).select();
    },
  },
});
</script>
