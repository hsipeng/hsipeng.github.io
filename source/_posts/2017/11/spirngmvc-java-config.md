---
layout: post
tags: spring MVC java config
title: Spring MVC java config
date: 2017-11-11 10:01:22

---
# spring MVC java config


## 编程环境
java 1.8
tomcat 8
spring 4.3.12.RELEASE
mybatis 3.4.0
mybatis-spring 1.3.0

## web 配置

web.xml 配置
```xml
 <servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
    <async-supported>true</async-supported>
  </servlet>
  <servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>utf-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

java config

```java
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {

        return new Class<?>[] { RootConfig.class };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        // 制定配置类
        return new Class<?>[] { WebConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        // 讲DispatcherServlet 映射到“/”
        return new String[] { "/" };
    }

    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
//      //shiro
//      DelegatingFilterProxy delegatingFilterProxy = new DelegatingFilterProxy();
//      delegatingFilterProxy.setBeanName("shiroFilter");
        return new Filter[] { characterEncodingFilter};
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        registration.setInitParameter("throwExceptionIfNoHandlerFound", "true");
    }

}

```


## spring 配置

xml
```xml
<!-- 引入属性文件 -->
    <bean id="propertyConfigurer"
        class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="systemPropertiesModeName" value="SYSTEM_PROPERTIES_MODE_OVERRIDE" />
        <property name="ignoreResourceNotFound" value="true" />
        <property name="locations">
            <list>
                <value>classpath:config/config.properties</value>
                <value>classpath:config/shiro-config.properties</value>
            </list>
        </property>
    </bean>


    <import resource="spring/spring-mybatis.xml"/>
```


java config
```java

@Configuration
@ComponentScan(basePackages = { "com" }, excludeFilters = {
        @Filter(type = FilterType.ANNOTATION, value = EnableWebMvc.class) })
@PropertySource(value = "classpath:config.properties", encoding = "utf-8")
@EnableAspectJAutoProxy(proxyTargetClass = true)
@Import({ MybatisConfig.class })
public class RootConfig {
}
```


## web MVC

xml
```xml
<mvc:annotation-driven>
    <!-- json 处理  ie下载提示 -->
        <mvc:message-converters register-defaults="true">
            <ref bean="stringHttpMessageConverter" />
            <ref bean="fastJsonHttpMessageConverter" />
        </mvc:message-converters>
    </mvc:annotation-driven>


    <!-- 自动扫描(自动注入) -->
    <context:component-scan base-package="com" />

    <!-- cache-period="315360000" -->
    <mvc:resources mapping="/images/**" location="/images/" />
    <mvc:resources mapping="/imgs/**" location="/imgs/" />
    <mvc:resources mapping="/attachment/**" location="/attachment/" />
    <mvc:resources mapping="/css/**" location="/css/" />
    <mvc:resources mapping="/js/**" location="/js/" />


    <!-- 自动扫描 标签 -->
    <bean name="springContextUtil" class="com.common.commonutil.runtime.SpringContextUtil" scope="singleton"></bean>

    <!-- 这个一定得有，注意了，如果其他配置也有需要这个，已经配置了，那不必了 -->

    <!-- json 处理  ie下载提示 -->
    <bean id="stringHttpMessageConverter"
        class="org.springframework.http.converter.StringHttpMessageConverter">
        <constructor-arg value="UTF-8" index="0"></constructor-arg>
        <property name="supportedMediaTypes">
            <list>
                <value>text/plain;charset=UTF-8</value>
            </list>
        </property>

```

java config
```java
/**
 * web 配置 替代springmvc xml servlet
 * @author Administrator
 *
 */
@Configuration
@EnableWebMvc
@Import({AspectConfig.class})
@SuppressWarnings("deprecation")
public class WebConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware{
    /**
     *  jsp html view
     */
//  @Bean
//  public ViewResolver viewResolver(){
//      //jsp html view模板
//      InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//      resolver.setPrefix("/admin/");
//      resolver.setSuffix(".html");
//      resolver.setExposeContextBeansAsAttributes(true);
//      return resolver;
//  }

    //static resources
      @Override
      public void addResourceHandlers(ResourceHandlerRegistry registry) {
          registry.addResourceHandler("/css/**").addResourceLocations("/css/");
          registry.addResourceHandler("/img/**").addResourceLocations("/img/");
          registry.addResourceHandler("/js/**").addResourceLocations("/js/");
      }


    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer){
        configurer.enable();
    }
    private ApplicationContext applicationContext;

      public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
      }
/**
 * 单一 thymeleafview
 * @return
 */
      @Bean
      public ViewResolver viewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding("UTF-8");
        return resolver;
      }

      /**
       * 多种视图并存
       *
       * @return
       */

//    public ContentNegotiatingViewResolver contentNegotiatingViewResolver(){
//        ContentNegotiatingViewResolver cnv = new ContentNegotiatingViewResolver();
//        // Thymeleaf
//        List<ViewResolver> vrs = new ArrayList<ViewResolver>();
//        ThymeleafViewResolver thymelearfview = new ThymeleafViewResolver();
//        thymelearfview.setTemplateEngine(templateEngine());
//        thymelearfview.setCharacterEncoding("UTF-8");
//        String [] strs = new String[]{"thy/*"};
//        thymelearfview.setViewNames(strs);
//        thymelearfview.setOrder(2);
//        //jsp 视图
//        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//          resolver.setPrefix("WEB-INF/");
//          resolver.setViewNames("jsp/*");
//          resolver.setExposeContextBeansAsAttributes(true);
//          resolver.setOrder(1);
//        vrs.add(thymelearfview);
////          vrs.add(resolver);
//        cnv.setViewResolvers(vrs);
//        return cnv;
//    }


      @Bean
      public TemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setEnableSpringELCompiler(true);
        engine.setTemplateResolver(templateResolver());
        return engine;
      }

      private ITemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("/WEB-INF/thy/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(TemplateMode.HTML);
        return resolver;
      }

      /**
       * velocity
       * @return
       */
//  @Bean
//    public ViewResolver viewResolver() {
//
//      VelocityLayoutViewResolver bean = new VelocityLayoutViewResolver();
//        bean.setCache(true);
//        bean.setPrefix("/WEB-INF/views/");
//        bean.setLayoutUrl("/WEB-INF/layouts/layout.vm");
//        bean.setSuffix(".vm");
//        return bean;
//    }
//
//    @Bean
//    public VelocityConfigurer velocityConfig() {
//        VelocityConfigurer velocityConfigurer = new VelocityConfigurer();
//        velocityConfigurer.setResourceLoaderPath("/");
//        return velocityConfigurer;
//    }

    //定义spring文件上传编码
      @Bean
      public CommonsMultipartResolver multipartResolver() {
          CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
          multipartResolver.setDefaultEncoding("UTF-8");
          return multipartResolver;
      }


      //解析json返回数据
      @Bean
      public StringHttpMessageConverter stringHttpMessageConverter(){
          StringHttpMessageConverter shmc = new StringHttpMessageConverter();
          shmc.setSupportedMediaTypes(Arrays.asList(new MediaType("text", "plain", Charset.forName("UTF-8"))));
          return shmc;
      }

      @Bean
      public HttpMessageConverter<?> fastJsonHttpMessageConverter4(){
          Feature[] features ={Feature.AllowArbitraryCommas,
                  Feature.AllowUnQuotedFieldNames,
                  Feature.DisableCircularReferenceDetect};
          FastJsonHttpMessageConverter4 fjtmc4 = new FastJsonHttpMessageConverter4();
          fjtmc4.setSupportedMediaTypes(Arrays.asList(new MediaType("text", "html", Charset.forName("UTF-8"))));
          fjtmc4.setSupportedMediaTypes(Arrays.asList(new MediaType("application", "json", Charset.forName("UTF-8"))));
          FastJsonConfig fjc = new FastJsonConfig();
          fjc.setFeatures(features);
          fjc.setDateFormat("yyyy-MM-dd HH:mm:ss");
          fjtmc4.setFastJsonConfig(fjc);
          return (HttpMessageConverter<?>) fjtmc4;
      }
      //json处理 解决ie下载提示
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(stringHttpMessageConverter());
        converters.add(fastJsonHttpMessageConverter4());
        super.configureMessageConverters(converters);
    }



}

```


## mybatis
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="lazyLoadingEnabled" value="false" />
        <setting name="logImpl" value="LOG4J" />
    </settings>
    <!-- mybatis分页拦截器 -->
    <plugins>
        <plugin interceptor="com.common.commonutil.pagehelper.PageInterceptor"></plugin>
    </plugins>
</configuration>
```


java config
```java

@PropertySource(value = "classpath:config.properties", encoding = "utf-8")
@Configuration
public class MybatisConfig{

    private Environment environment;

    @Autowired
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
        return new PropertySourcesPlaceholderConfigurer();
    }


    @Bean(name={"writeDataSource"})
    public DruidDataSource writeDataSource(Environment env) {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(env.getProperty("db.write.driver"));
        dataSource.setUrl(env.getProperty("db.write.url"));
        dataSource.setUsername(env.getProperty("db.write.username"));
        dataSource.setPassword(env.getProperty("db.write.password"));
        dataSource.setInitialSize(0);
        dataSource.setMaxActive(20);
        dataSource.setMinIdle(0);
        dataSource.setMaxWait(0);
        try {
            dataSource.setFilters("stat,log4j,wall");
        } catch (SQLException e) {
            LoggerUtils.error(getClass(), e.getMessage());
            // e.printStackTrace();
        }
        return dataSource;
    }

    @Bean(name={"readDataSource"})
    public DruidDataSource readDataSource(Environment env) {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(env.getProperty("db.read.driver"));
        dataSource.setUrl(env.getProperty("db.read.url"));
        dataSource.setUsername(env.getProperty("db.read.username"));
        dataSource.setPassword(env.getProperty("db.read.password"));
        dataSource.setInitialSize(0);
        dataSource.setMaxActive(20);
        dataSource.setMinIdle(0);
        dataSource.setMaxWait(0);
        try {
            dataSource.setFilters("stat,log4j,wall");
        } catch (SQLException e) {
            LoggerUtils.error(getClass(), e.getMessage());
            // e.printStackTrace();
        }
        return dataSource;
    }

    @Bean(name = "dataSource")
    public DynamicDataSource dataSource(@Qualifier("readDataSource") DruidDataSource readDataSource
            ,@Qualifier("writeDataSource") DruidDataSource writeDataSource) {
        DynamicDataSource dataSource = new DynamicDataSource();
        dataSource.setWriteDataSource(writeDataSource);
        dataSource.setReadDataSource(readDataSource);
        return dataSource;
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory(@Qualifier("dataSource") DynamicDataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            sqlSessionFactory.setMapperLocations(resolver.getResources("classpath*:/mappers/**/*.xml"));
            sqlSessionFactory.setFailFast(true);
        } catch (IOException e) {
            LoggerUtils.error(getClass(), "sqlsession" + e.getMessage());
            // e.printStackTrace();
        }
        return sqlSessionFactory;
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {

        return new SqlSessionTemplate(sqlSessionFactory);
    }

    @Bean
    public MapperScannerConfigurer scannerConfigurer() {
        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setBasePackage("com.**.**.mapper");
        return configurer;
    }

    @Bean
    public DataSourceTransactionManager transactionManager(@Qualifier("dataSource") DynamicDataSource dataSource) {
        DataSourceTransactionManager tsm = new DataSourceTransactionManager();
        tsm.setDataSource(dataSource);
        return tsm;
    }


    /**
     * mybatis 分页插件配置
     * @return
     */
    @Bean
    public PageHelper pageHelper() {
        LoggerUtils.debug(getClass(), "MyBatisConfiguration.pageHelper()");
        PageHelper pageHelper = new PageHelper();
        Properties p = new Properties();
        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "true");
        p.setProperty("reasonable", "true");
        pageHelper.setProperties(p);
        return pageHelper;
    }

    @Bean
    public DynamicDataSourcePlugin dynamicDataSourcePlugin(){
        return new DynamicDataSourcePlugin();
    }
```


