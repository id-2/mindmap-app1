I need to build a canvas with mindmap's node used to generate new nodes via prompts and completion openai api calls wrapped into langchain functions

Project Overview
	1. **Interactive Mindmap Canvas**: Users can generate mindmap nodes through prompts, using OpenAI's API wrapped in LangChain functions.
	2. **User Authentication**: Sign up/sign in functionality at the front.
	3. **Node Generation and Editing**: Nodes are generated based on user input, editable, and can have various styles and attributes.
	4. **Real-time Interaction**: All actions should be streamed to the user.
	5. **Sidebar Panel**: For detailed node editing and additional operations.
	6. **Data Handling**: Use of various databases and APIs for storing and processing data.
	7. **Deployment and Backend Integration**: Using Docker, Vercel, and other tools for deployment and backend services.



  everything interactive, etc  
   user sign up / sign in layout in the front, to start  
  
  signed user instead of this layout can view the canvas and beautiful bar on the center, within an input option  
  
  based on user's input, there should be the mindmap generated on that canvas  
  
  canvas should be with resizable scale (by + and - buttons, also by scrolling up and down)  
  canvas contains items - items are beautiful nodes on transparent bg only with border, nodes contains text  
  text is a result of openai api call, called based on user's input  
  openai api responding in json format with keys 'node', 'type', 'domain', 'subdomain', 'relationship', 'description','valueability', 'applicability', 'keywords', 'keyphrases', 'rationale'  
  so, 'node' should go to the node as the part of mindmap on the canvas (lets say, node's font size is 14)  
  node should contain small bottom-bar (font size is 6) with its parameters:  
- node's type (from 'type')
- attachments (later, after it is generated, user can attach to the node some files of any format - so, for bottom-bar it should be like a true/false, if false - no svg to display, if true - display svg attachments icon with a count of attachments)
- last edited time (or creation time as a default)
  
  
  any kind of generation and mindmap creation / population should be streamed to the user  
  each node should be editable, clickable, and available to drag  
  it should be available for user to choose many nodes at once  
  nodes should be in selected state (by click), and opened state (opening on the sidebar, by double-click)  
  it should be available to re-style nodes:  
- size of font: let users pick any from sized available: 8, 10, 12, 14, 16, 18, 20, 22, 24 - the default is 14 (bottom-bar is 6 when node is 14; is 3 when node is 8; is 11 when node is 24)
- color of border
- tickness of border
- color of background
- transparency of background
- transparency of border
  
  by clicking on the node, it is a sidebar panel appeared from right, while the canvas staying on the background and turning into non-active mode since user is focused on sidebar)   
  
  sidebar should be slide-out back to the right if user clicked ''save'', ''generate'', ''reset'' buttons inside the sidebar, as well as sidebar should be slide-out back to the right if user just clicked back to the canvas – any of these actions related to closing the sidebar are turning the canvas back into the active mode  
  
  
  
  on the sidebar panel there are ''save'', ''reset', ''generate'' displaying in the top right corner of that sidebar  
  ''generate'' button means that user wants to go back to canvas and continue the generation of the mindmap from this current node (generation should be started automatically after user clicked this button)  
  
  
  the other content of the node displayed on the sidebar is:  
- the title of the node (this is similar to the 'node') [font 16], section # Title
- below it there are a string contains 'type' wrapped into colored tag as the left part and the time of creation and last edition - as the right part [font 8], section ##### Metadata
- below it there are non-editable key titles and editable key contents: titles are general 'node', 'type', 'domain', 'subdomain', 'relationship', 'description','valueability', 'applicability', 'keywords', 'keyphrases', 'rationale', while its' content is just automatically should be taken from respond [font 10], section #### Attributes
- below it there are a markdown WYSIWIG editor with a button to switch between editing state and reading state [font 12], section ### Text area
- - it is empty area by default, but could be filled by the user
- - this editor in its' head-bar contains a typical styling options as a buttons, placed on the leftside
- - also it is contains a buttons named as ''Explore'', ''Negotiate'' on the rightside
- - by clicking on those buttons there should be another openai api call initiated which will contain the original keys and request as a context leading by prompt, related to corresponding action  (''exploring prompt'', ''negotiating prompt'')
- below it there is a list of attached files' titles with its formats and size (if any was attached earlier) available for download by click, section ### Attachments
- - below there is an area for attaching files (any kind of files could be attached, max. size could be 100mb) supports also the drag-n-drop option
- and finally there are buttons to download ''as docx'', ''as xlsx'', ''as pdf'', ''as json'', ''as zip'', and buttons to share ''send to telegram'', ''send to email''
  
  
  the mindmap in its bottom left corner should have a buttons to download it as svg, png, as pdf, as markdown, as json, or to copy its js code or html of it in order to let users embed it into their websites  
  
  by clicking on pdf, markdown and json options there're appearing another 2 buttons right upper the chosen option: download only mindmap or download with its nested content (it includes all node's content that could be viewed in sidebar, as for the attached files - the downloading option should in that case include just url to download correspondent attachment wrapped by its title, fileformat and filesize under the ###  Attachments section formats, d urls to attached files)  
  
  for concurrent processing of api calls to openai, there should be used a langchain runnables   
  so, any prompt and/or action as on the sidebar as on the mindmap and canvas should be wrapped into the langchain runnable scripts if it consider to use openai api to take an action in place  
  no direct api calls to openai, just langchain functions   
  
  
  it is should be available to add files to the canvas by drag-n-drop, or to create another canvas (autosave for user account should be supported)   
  
  user by default is using the openai key we've provided, but with limited amount of requests overall to 100, it should be available for the user to insert it's own api key and start use it instead of default one  
  to store texts from mindmaps, canvases, #### attributes, ### text areas - there should be a chromadb vector database connected by default, contained information limited to the user's account, and it should be also the neon vector database and pinecone vector database connected  
  
  chromadb vector database should be used to provide a previous context of mindmap / keys / etc. in user's requests generating new nodes to mindmaps created previously (clean canvas = no context; mindmap on canvas and/or generating from node = add the context)  
  
  i prefer to use nextjs with tailwind stylings (or shadcn ui)  
  back-end should be a docker container and linked to front-end  
  front-end should be deployed on vercel and linked to back-end  
  neon database / postgre database should be connected as a vercel's extensions/integrations  
  chromadb should be deployed as a docker container and connected to back-end/front-end  
  it is ok to use fastapi if needed  
  it is ok to use langchain with langserve if needed  
  if there required any kind of proxy-related, ip-related and/or domain-related operations, they should be done in the most easiest way  
  
  
  the codebase should contain readme.md with the tree (detailed and described in brief)  
  in readme should be described also the frameworks/approached applied as well as the reason to use concrete framework/approach  
  in readme should be also step-by-step instructions (supported by checklists) for deployment.  
  in readme there are all of dependencies should be described  
  in readme there are all commands for installation should be provided  
  the architecture of code should be ultra-microservice-like, we should put functions in separate code files interconnected with each other  
  there are comments should be provided inside each code file - as for modules, as for functions, as for classes, as for actions / events, as for dependencies installation, as for linking and connecting  
  codefiles should start with comments which should describe the general logic of concrete file and list its sections/parts within a rationale brief  
-
-

Blending web development, AI integration, and advanced front-end features in Svelte and SvelteKit, let's break down initial requirements and suggest approaches based on my expertise and knowledge in Svelte and SvelteKit.

- ### Project Overview
	1. **Interactive Mindmap Canvas**: Users can generate mindmap nodes through prompts, using OpenAI's API wrapped in LangChain functions.
	2. **User Authentication**: Sign up/sign in functionality at the front.
	3. **Node Generation and Editing**: Nodes are generated based on user input, editable, and can have various styles and attributes.
	4. **Real-time Interaction**: All actions should be streamed to the user.
	5. **Sidebar Panel**: For detailed node editing and additional operations.
	6. **Data Handling**: Use of various databases and APIs for storing and processing data.
	7. **Deployment and Backend Integration**: Using Docker, Vercel, and other tools for deployment and backend services.

- ### Development Plan
- #### 1. **User Authentication and Layout**
- **Frontend**: Use SvelteKit for building the sign-up/sign-in pages.
- **Backend**: Integrate with a backend service for authentication. You could use Firebase Authentication for simplicity.
  
  ```javascript
  // Example of a simple sign-in function in SvelteKit
  import { signInWithEmailAndPassword } from 'firebase/auth';
  
  async function signIn(email, password) {
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          // Handle the signed-in user.
      } catch (error) {
          // Handle errors.
      }
  }
  ```
- #### 2. **Canvas for Mindmap**
- **Canvas Initialization**: Use an HTML canvas element with Svelte's reactivity to handle zoom and node manipulation.
- **Zoom and Pan**: Implement custom zoom and pan functionality using JavaScript.
  
  ```javascript
  // Zooming in and out on the canvas
  let scale = 1;
  const zoomIn = () => { scale *= 1.1; };
  const zoomOut = () => { scale /= 1.1; };
  ```
- #### 3. **Node Generation and Interaction**
- **Node Structure**: Each node is an object with properties derived from the OpenAI API response.
- **Node Interaction**: Implement drag-and-drop, selection, and editing functionalities.
- #### 4. **Integration with OpenAI and LangChain**
- **API Calls**: Wrap OpenAI API calls in LangChain functions for node generation based on user input.
- **Concurrency Handling**: Use JavaScript async/await for handling concurrent API calls.
- #### 5. **Sidebar Panel**
- Implement a sidebar panel in Svelte that appears on node interaction.
- Include controls for saving, generating, and resetting node content.
- #### 6. **Data Handling**
- **Databases**: Connect to ChromaDB, Neon, and Pinecone databases for storing and retrieving data.
- **API Integration**: Use FastAPI for backend API development, which will interact with the databases and OpenAI.
- #### 7. **Deployment**
- **Backend**: Containerize the backend with Docker and deploy.
- **Frontend**: Deploy the SvelteKit frontend on Vercel.
- **Database Connections**: Integrate databases with your deployed backend.
- #### 8. **Documentation and Codebase Management**
- Create a comprehensive `README.md` with a project overview, deployment instructions, and a codebase tree.
- Adopt an ultra-microservice architecture, separating functionalities into different modules with detailed comments and documentation.
- ### Example Code Snippet
  Here's a small snippet to get you started with a draggable node in Svelte:  
  
  ```svelte
  <script>
  let x = 0;
  let y = 0;
  
  function handleDrag(event) {
    x += event.dx;
    y += event.dy;
  }
  </script>
  
  <div use:draggable on:drag={handleDrag} style="position: absolute; left: {x}px; top: {y}px;">
  Your Node Content
  </div>
  ```
- ### Additional Notes
- **Framework Choices**: I recommend using SvelteKit and Tailwind CSS for the frontend for their simplicity and efficiency. FastAPI is a great choice for the backend due to its performance and ease of use.
- **Microservices Architecture**: Ensure that each microservice is focused on a single responsibility, which aids in maintenance and scalability.
- **Testing and Quality Assurance**: Ensure to include unit and integration tests, especially for the backend services and API integrations.
  
  Given the complexity of this project, it would be beneficial to approach it in phases, starting with the core functionalities like user authentication, basic canvas operations, and simple node generation, before gradually integrating the OpenAI API, LangChain, and additional features.