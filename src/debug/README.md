# Debug

`DebugModule` registers a decorator that outputs logs along with the execution time in all methods of the `controllers` and `providers` of the module (including import module) to which the `@Debug` decorator is applied. \
Instead of adding a log to every method one by one, you can leave a log of execution of all methods with one decorator. \
It can also be applied only to specific classes or methods.

## Usage

### Module

```ts
@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [...],
  providers: [...],
})
export class AppModule {}
```

To exclude a specific class within a module

```ts
@Debug({ context: 'ModuleContext', exclude: [AppService] })
// OR
DebugModule.forRoot({ exclude: ['SampleService'] })
```

### Class

You don't need to import `DebugModule` and `@Debug` when using it in class. It works as a separate decorator. \
Registering `@DebugLog` in a class applies to all methods in the class, so there is no need to register `@DebugLog` in a method.

```ts
@Controller()
@DebugLog('ClassContext')
export class AppController {
  @Get()
  @DebugLog('MethodContext')
  public method() {}
}
```
