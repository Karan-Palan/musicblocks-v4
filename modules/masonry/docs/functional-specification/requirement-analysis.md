# Requirements Analysis for Masonry Framework:

#### 1. Default Primitive Values or Macros  
There should be support for default primitive values, which are the basic, predefined data values used by the system. Alternatively, macros can be used to define reusable code snippets or functions that perform common operations.

#### 2. Dropdown for Instructions  
The framework should provide a dropdown menu for users to select from a list of predefined instructions, enabling them to quickly choose actions for their bricks.

#### 3. Dropdown for Arguments  
A dropdown menu should allow users to easily select arguments to pass into bricks, streamlining the process of providing necessary parameters.

#### 4. Switch Between Related Brick Types  
Users should be able to quickly switch between related brick types, facilitating ease of use when working with similar bricks that perform related functions.

#### 5. Composite Bricks (e.g., if-else, switch-case-default)  
The framework should support composite bricks, which allow users to create more complex logic structures, such as conditional (`if-else`) and switch-case-default control flows.

#### 6. Empty Brick Placeholder (pass)  
A placeholder brick should be available for situations where a brick is required but no specific action is needed at that moment. This would serve as a visual placeholder or a "pass" operation.

#### 7. Embedded Arguments (e.g., solfège, mode, instrument)  
Certain bricks should have embedded arguments, such as musical concepts like solfège, mode, or instrument. These embedded values can be overridden by variables where necessary.

#### 8. Varying Arguments (e.g., actions or operations like +, *, and, or, xor)  
Bricks should support a variety of argument types, including mathematical operations (`+`, `*`) and logical operations (`and`, `or`, `xor`), which can be passed as function parameters.

#### 9. Foldable Blocks  
Blocks in the workspace should be foldable, allowing users to collapse complex blocks to hide details and manage workspace clutter.

#### 10. Support for Both Horizontal and Vertical Argument Syntax  
The framework should support the placement of arguments both horizontally (inline) and vertically (stacked), providing flexibility in how bricks are connected and organized.

#### 11. Type Check on Try-Connect  
The system should implement type checking when users attempt to connect bricks, ensuring that only compatible brick types can be linked together.

#### 12. Hint Button  
A hint button should be included to provide users with helpful information or guidance about how to use a particular brick or function.

#### 13. Menu Button  
A menu button should provide access to additional options or settings, allowing users to configure bricks or perform other related actions.

#### 14. Pie Menu / Grid / Dropdown  
The framework should offer various user interface components for selecting options, such as a pie menu, grid, or dropdown menu, allowing for intuitive navigation.

#### 15. Focus Brick / Defocus Everything Else  
Users should have the ability to focus on a specific brick, dimming or defocusing other bricks in the workspace to minimize distractions and help users concentrate on the task at hand.

#### 16. Typed Variables  
The framework should support typed variables, ensuring that variables have defined data types (e.g., integer, string) to prevent errors and maintain consistency.

#### 17. Multiple Family Embedded Arguments (e.g., solfège, sargam)  
The framework should accommodate multiple families of embedded arguments, such as musical systems (e.g., solfège, sargam), providing flexibility in musical programming.

#### 18. Dictionaries  
Support for dictionaries as a data structure should be included, allowing users to store key-value pairs for efficient data retrieval.

#### 19. Lists  
The framework should support lists as a data structure, enabling users to manage collections of items within the workspace.

#### 20. Boolean Primitive Toggle Switch  
A toggle switch should be available for boolean primitives, allowing users to easily switch between `true` and `false` values.

#### 21. Classes / Objects  
The framework should support object-oriented programming concepts, allowing users to define and manipulate classes and objects.

#### 22. Global vs Local Variables  
The framework should differentiate between global variables, which are accessible across the entire program, and local variables, which are limited to specific scopes or functions.

#### 23. Shadow Bricks for Feedback on Connection Attempts / Disconnections  
When users attempt to connect or disconnect bricks, shadow bricks should appear to provide visual feedback, indicating whether the connection was successful or not.