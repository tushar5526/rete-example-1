import { BuilderPlugin } from "../../core/Plugins/Plugin";
import PluginManager from "../../core/Plugins/PluginManager";
import blogsReducer, { addBlog, editBlog } from "./store";
import { BlogComponent } from "./blocks/blogs";

const plugin = new BuilderPlugin("Blogs");

plugin.addAction({
  action: addBlog,
  name: "Add Blog",
  schema: {
    type: "object",
    required: ["title"],
    properties: {
      title: {
        type: "string",
        title: "Blog title",
        default: "New Blog"
      }
    }
  }
});

plugin.addAction({
  action: editBlog,
  name: "Edit Blog",
  schema: {
    type: "object",
    required: ["title"],
    properties: {
      title: {
        type: "string",
        title: "Blog Title",
        default: "New blog"
      }
    }
  }
});

plugin.addReducer({
  reducer: blogsReducer,
  name: "Blogs"
});

plugin.addBlock({
  component: BlogComponent,
  name: "Blog Component",
  type: BuilderPlugin.ComponentTypes.Content,
  isDroppable: false,
  schema: {
    properties: {
      text: {
        title: "Blog Title",
        default: "New Blog",
        type: "string"
      }
    }
  },
  uiSchema: {}
});

PluginManager.registerPlugin(plugin);

export default plugin;
