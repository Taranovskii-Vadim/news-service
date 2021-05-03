import paragraph from "@editorjs/paragraph";
import header from "@editorjs/header";
import image from "@editorjs/image";

export const i18n = {
  /**
   * @type {I18nDictionary}
   */
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "Нажмите, чтобы настроить",
          "or drag to move": "или перетащите",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "Конвертировать в",
        },
      },
      toolbar: {
        toolbox: {
          Add: "Добавить",
        },
      },
    },
    toolNames: {
      Text: "Параграф",
      Heading: "Заголовок",
      Image: "Изображение",
      Warning: "Примечание",
    },
    blockTunes: {
      delete: {
        Delete: "Удалить",
      },
      moveUp: {
        "Move up": "Переместить вверх",
      },
      moveDown: {
        "Move down": "Переместить вниз",
      },
    },
  },
};

export const configEditorTools = prjConfig => ({
  paragraph,
  header,
  image: prjConfig.image ? { class: image, config: prjConfig.image } : image,
});
