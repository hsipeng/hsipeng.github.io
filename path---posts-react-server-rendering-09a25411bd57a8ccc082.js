webpackJsonp([266416985907],{390:function(n,s){n.exports={data:{site:{siteMetadata:{title:"ALEX P . X - lirawx.me",subtitle:"Life is short, let it be undefined.",copyright:"© 2018 All rights reserved.",author:{name:"Lirawx.",twitter:"lira_wx"},disqusShortname:"lirawx",url:"https://lirawx.me"}},markdownRemark:{id:"/home/travis/build/lirawx/lirawx.github.io/src/pages/articles/2018-10-06---Server-side-rendering/index.md absPath of file >>> MarkdownRemark",html:'<p>Hello , I’am lirawx. In this article I will show you how to change a react project to react server rendering with some simple steps.  source code on GitHub\n<a href="https://github.com/lirawx/react-starter-kit/tree/ssr">GitHub - lirawx/react-starter-kit at ssr</a></p>\n<h2>environment</h2>\n<ul>\n<li>react 16</li>\n<li>webpack 4</li>\n<li>router 4</li>\n<li>babel 7</li>\n<li>…</li>\n</ul>\n<h2>First Step</h2>\n<p>Assume you have already known how to build a react base project.</p>\n<p>src/app.jsx</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">\'@babel/polyfill\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>Provider<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">\'./redux/store\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">\'./router\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>BrowserRouter<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'@/assets/style/index.css\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'@/assets/scss/main.scss\'</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>BrowserRouter<span class="token operator">></span>\n      <span class="token operator">&lt;</span>Router <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>like above , we usually use this file on the entry file. when come to server rendering, we will make a little change here.</p>\n<p><code class="language-text">ReactDOM.render</code>.=> <code class="language-text">ReactDOM.hydrate</code></p>\n<blockquote>\n<p>hydrate is design to support server side rendering. for more information you can go office docs.</p>\n</blockquote>\n<h2>Second Step</h2>\n<p>A little change in routes file to make sure server and local dev routers be the same.\nI recommend one package from the official community , <code class="language-text">react-router-config</code>. We use two <code class="language-text">renderRoutes</code> methods.</p>\n<p>router/index.jsx</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>renderRoutes<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-config\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Routes <span class="token keyword">from</span> <span class="token string">\'./Routes\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">\'@/components/Header\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> LeftMenu <span class="token keyword">from</span> <span class="token string">\'@/components/leftMenu\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Footer <span class="token keyword">from</span> <span class="token string">\'@/components/Footer\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span>Header <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"container"</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>LeftMenu <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token punctuation">{</span><span class="token function">renderRoutes</span><span class="token punctuation">(</span>Routes<span class="token punctuation">)</span><span class="token punctuation">}</span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span>Footer <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>router/Routes</p>\n<p>routes structure like this.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    id<span class="token punctuation">:</span> <span class="token string">\'1\'</span><span class="token punctuation">,</span>\n    parent<span class="token punctuation">:</span> <span class="token string">\'0\'</span><span class="token punctuation">,</span>\n    path<span class="token punctuation">:</span> <span class="token string">\'/\'</span><span class="token punctuation">,</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'home\'</span><span class="token punctuation">,</span>\n    exact<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    component<span class="token punctuation">:</span> Home<span class="token punctuation">,</span>\n    routes<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    id<span class="token punctuation">:</span> <span class="token string">\'2\'</span><span class="token punctuation">,</span>\n    parent<span class="token punctuation">:</span> <span class="token string">\'0\'</span><span class="token punctuation">,</span>\n    path<span class="token punctuation">:</span> <span class="token string">\'/counter\'</span><span class="token punctuation">,</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'counter\'</span><span class="token punctuation">,</span>\n    component<span class="token punctuation">:</span> ReduxHome<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    id<span class="token punctuation">:</span> <span class="token string">\'3\'</span><span class="token punctuation">,</span>\n    parent<span class="token punctuation">:</span> <span class="token string">\'0\'</span><span class="token punctuation">,</span>\n    path<span class="token punctuation">:</span> <span class="token string">\'/page2\'</span><span class="token punctuation">,</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'page2\'</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">component</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>page2<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span></code></pre>\n      </div>\n<h2>Third step</h2>\n<p>Build a node server </p>\n<p>first, we use <code class="language-text">express</code>. and the koa server file will be show as below</p>\n<p>server/index.js</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">\'@babel/polyfill\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">\'express\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>matchRoutes<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-config\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> render <span class="token keyword">from</span> <span class="token string">\'./render\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">\'../src/redux/store\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Routes <span class="token keyword">from</span> <span class="token string">\'../src/router/Routes\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token constant">PORT</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">8079</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">\'/assets\'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">\'build/assets\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\napp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">\'*\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token string">\'render some thing here.\'</span>\n\n  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token constant">PORT</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Frontend service listening on port: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">PORT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>Third step</h2>\n<p>This step is mostly important on server side rendering.we use<code class="language-text">renderToString</code> in  <code class="language-text">react-dom/server</code> package  to render components to string and send it back to browser. And thanks to <code class="language-text">react-router</code> V4, we use StaticRouter to manage our routers in server.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>renderToString<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-dom/server\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>Provider<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>StaticRouter<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">\'../src/router\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">\'path\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> fs <span class="token keyword">from</span> <span class="token string">\'fs\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> indexFile <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'./build/index.html\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">pathname<span class="token punctuation">,</span> store<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>StaticRouter location<span class="token operator">=</span><span class="token punctuation">{</span>pathname<span class="token punctuation">}</span> context<span class="token operator">=</span><span class="token punctuation">{</span>context<span class="token punctuation">}</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>Router <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>StaticRouter<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>indexFile<span class="token punctuation">,</span> <span class="token string">\'utf8\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> indexData</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">\'Something went wrong:\'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      <span class="token function">resolve</span><span class="token punctuation">(</span>\n        indexData<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>\n          <span class="token string">\'&lt;div id="app">&lt;/div>\'</span><span class="token punctuation">,</span>\n          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div id="app"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div>&lt;script>\n        window.INITIAL_STATE = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>\n          store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n      &lt;/script></span><span class="token template-punctuation string">`</span></span>\n        <span class="token punctuation">)</span>\n      <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<blockquote>\n<p>above is rendering a html which webpack is already build, and we simple replace <code class="language-text">#app</code> node to insert server render string. and give the store server build it.</p>\n</blockquote>\n<h2>Fifth Step</h2>\n<p>Change render in express file.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">\'@babel/polyfill\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">\'express\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>matchRoutes<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-config\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> render <span class="token keyword">from</span> <span class="token string">\'./render\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">\'../src/redux/store\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Routes <span class="token keyword">from</span> <span class="token string">\'../src/router/Routes\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token constant">PORT</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">8079</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// server webpack build static</span>\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">\'/assets\'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">\'build/assets\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\napp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">\'*\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n\n<span class="token comment">// get the render string.</span>\n  <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">render</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>path<span class="token punctuation">,</span> store<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token constant">PORT</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Frontend service listening on port: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">PORT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>server rendering with Koa.</h2>\n<p>just change two things.</p>\n<ul>\n<li>static server</li>\n<li>router config</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">bodyParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// static file server</span>\n  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>\n    <span class="token function">statics</span><span class="token punctuation">(</span><span class="token string">\'build\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n      extensions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'css\'</span><span class="token punctuation">,</span> <span class="token string">\'js\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> app<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// TODO: Error handling</span>\n\n  <span class="token comment">// Add routes</span>\n  <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>FInal</h2>\n<p>All done. Thanks.</p>',fields:{tagSlugs:["/tags/react/","/tags/javascript/","/tags/web-development/","/tags/ssr/"]},frontmatter:{title:"React Server Rendering",tags:["react","Javascript","Web Development","SSR"],date:"2018-10-06T22:40:32.169Z",description:"An Essay on how to config react server side rendering with express or koa, just a simple demo for you, wish you enjoy.."}}},pathContext:{slug:"/posts/React-Server-Rendering/"}}}});
//# sourceMappingURL=path---posts-react-server-rendering-09a25411bd57a8ccc082.js.map