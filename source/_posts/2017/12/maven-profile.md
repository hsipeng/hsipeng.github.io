---
layout: post
tags: maven profile
title: maven profile切换
date:2017-12-17

---

当用maven管理工程后，线上线下环境的切换就变得很有必要了，灵活切换有助于项目的开发和测试。

<!-- more -->

## 环境

- mac os 10.13.2
- idea 2017.2
- maven 3.5


## maven 配置

首先pom.xml 定义 两个profile ，这边一个开发环境dev一个生产环境 prod

```xml

<profiles>
        <profile>
            <id>dev</id>
            <properties>
                <profiles.active>dev</profiles.active>
            </properties>
            <build>
                <resources>
                    <resource>
                        <directory>src/main/resources</directory>
                        <filtering>false</filtering>
                        <includes>
                            <include>**/**/*.properties</include>
                            <include>**/*.xml</include>
                        </includes>
                        <excludes>
                            <exclude>config/*</exclude>
                        </excludes>

                    </resource>
                    <resource>
                        <filtering>true</filtering>
                        <directory>src/main/resources/config/${profiles.active}/*</directory>
                    </resource>
                </resources>
            </build>
        </profile>

        <profile>
            <id>prod</id>
            <properties>
                <profiles.active>prod</profiles.active>
            </properties>
            <build>
                <resources>
                    <resource>
                        <directory>src/main/resources</directory>
                        <filtering>false</filtering>
                        <includes>
                            <include>**/**/*.properties</include>
                            <include>**/*.xml</include>
                        </includes>
                        <excludes>
                            <exclude>config/*</exclude>
                        </excludes>

                    </resource>
                    <resource>
                        <filtering>true</filtering>
                        <directory>src/main/resources/config/${profiles.active}/*</directory>
                    </resource>
                </resources>
            </build>
        </profile>
    </profiles>

```

> resouces 可以配置包含哪个文件或者去除包含哪个文件，然后可以更具激活不同的dev 来包含正确的resource文件或者目录


之后因为web.xml中要加载applicationContext.xml其中数据库文件需要更具不同的profile来选择，所以需要把${profiles.active}
这个变量传递到web.xml中，pom.xml中build 标签下加入如下配置:

```xml

 <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-war-plugin</artifactId>
              <version>2.6</version>
              <configuration>
                  <warName>${project.artifactId}</warName>
                  <!-- 激活spring profile -->
                  <webResources>
                      <resource>
                          <filtering>true</filtering>
                          <directory>src/main/webapp</directory>
                          <includes>
                              <include>**/web.xml</include>
                          </includes>
                      </resource>
                  </webResources>
                  <warSourceDirectory>src/main/webapp</warSourceDirectory>
                  <webXml>src/main/webapp/WEB-INF/web.xml</webXml>
              </configuration>
          </plugin>
```


之后在web.xml 中 加入profile.active 这个变量

```xml

  <context-param>
    <param-name>profiles.active</param-name>
    <param-value>${profiles.active}</param-value>
  </context-param>

```


然后applicationContext.xml中就可以应用这个变量了。

```xml
<!-- 引入属性文件 -->
    <bean id="propertyConfigurer"
          class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="systemPropertiesModeName" value="SYSTEM_PROPERTIES_MODE_OVERRIDE" />
        <property name="ignoreResourceNotFound" value="true" />
        <property name="locations">
            <list>
                <value>classpath:config/${profiles.active}/config.properties</value>
            </list>
        </property>
    </bean>

```
