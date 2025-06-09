<svelte:options runes />
<script lang="ts" module>
    export type ThemeSpec = Record<string, StyleSpec>;
    export type StyleSpec = {
        [propOrSelector: string]: string | number | StyleSpec | null;
    };
</script>
<script lang="ts">
  import { indentWithTab } from '@codemirror/commands';
  import { indentUnit, type LanguageSupport } from '@codemirror/language';
  import { EditorState, StateEffect, type Extension } from '@codemirror/state';
  import { EditorView, keymap, placeholder as placeholderExt } from '@codemirror/view';
  import { basicSetup } from 'codemirror';
  import { IsMounted } from 'runed';
  import type { ClassValue } from 'svelte/elements';
  import { debounce } from './util.js';

  interface Props {
    class: ClassValue;
    value?: string | null | undefined;
    basic?: boolean;
    lang: LanguageSupport | null | undefined;
    theme?: Extension | null | undefined;
    extensions?: Extension[];
    useTab?: boolean;
    tabSize?: number;
    styles?: ThemeSpec | null | undefined;
    lineWrapping?: boolean;
    editable?: boolean;
    readonly?: boolean;
    placeholder?: string | HTMLElement | null | undefined;
    nodeBounce?: boolean;
    onReady?: (view: EditorView) => void;
    onReconfigure?: (view: EditorView) => void;
    onChange?: (change: string) => void;
  };

  const _mounted = new IsMounted();

  let {
		value = $bindable(),
    basic = true,
    lang,
    theme,
    extensions = [],
    useTab = true,
    tabSize = 2,
    styles,
    lineWrapping = false,
    editable = true,
    readonly = false,
    placeholder,
    nodeBounce = true,
    onReady,
    onReconfigure,
    onChange,
    ...props
  }: Props = $props();

  let view: EditorView;

  let update_from_prop = false;
  let update_from_state = false;
  let first_config = true;
  let first_update = true;

  let state_extensions = $derived([
    ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder, editable, readonly, lang),
    ...get_theme(theme, styles),
    ...extensions
  ]);

  $effect(() => {
    view && update(value);
  });
  $effect(() => {
    view && state_extensions && reconfigure();
  });

  let on_change = $derived(
			nodeBounce ? handle_change : debounce(handle_change, 300)
		);

  function create_editor_view(parent: Element): EditorView {
    return new EditorView({
      parent,
      state: create_editor_state(value),
      dispatch(transaction) {
        view.update([transaction]);

        if(!update_from_prop && transaction.docChanged) {
          on_change();
        }
      }
    });
  }

  function reconfigure(): void {
        if (first_config) {
            first_config = false;
            return;
        }

        view.dispatch({
            effects: StateEffect.reconfigure.of(state_extensions),
        });
        
        onReconfigure?.(view);
    }

    function update(value: string | null | undefined): void {
        if (first_update) {
            first_update = false;
            return;
        }

        if (update_from_state) {
            update_from_state = false;
            return;
        }

        update_from_prop = true;

        view.setState(create_editor_state(value));

        update_from_prop = false;
    }

    function handle_change(): void {
        const new_value = view.state.doc.toString();
        if (new_value === value) return;

        update_from_state = true;

        value = new_value;
        onChange?.(value);
    }

    function create_editor_state(value: string | null | undefined): EditorState {
        return EditorState.create({
            doc: value ?? undefined,
            extensions: state_extensions,
        });
    }

  function get_base_extensions(
        basic: boolean,
        useTab: boolean,
        tabSize: number,
        lineWrapping: boolean,
        placeholder: string | HTMLElement | null | undefined,
        editable: boolean,
        readonly: boolean,
        lang: LanguageSupport | null | undefined
    ): Extension[] {
        const extensions: Extension[] = [
            indentUnit.of(" ".repeat(tabSize)),
            EditorView.editable.of(editable),
            EditorState.readOnly.of(readonly),
        ];

        if (basic) extensions.push(basicSetup);
        if (useTab) extensions.push(keymap.of([indentWithTab]));
        if (placeholder) extensions.push(placeholderExt(placeholder));
        if (lang) extensions.push(lang);
        if (lineWrapping) extensions.push(EditorView.lineWrapping);

        return extensions;
    }

    function get_theme(theme: Extension | null | undefined, styles: ThemeSpec | null | undefined): Extension[] {
        const extensions: Extension[] = [];
        if (styles) extensions.push(EditorView.theme(styles));
        if (theme) extensions.push(theme);
        return extensions;
    }
</script>

{#if _mounted.current}
  <div class={["codemirror-wrapper", ...((Array.isArray(props.class) ? props.class : [props.class]))]} {@attach (node) => {
    $effect(() => {
      if (_mounted.current && node !== undefined) {
        view = create_editor_view(node);
        onReady?.(view);
      }
      return () => {
        if (view !== null) {
          view.destroy()
        }
      }
    })
  }}>
  </div>
{/if}