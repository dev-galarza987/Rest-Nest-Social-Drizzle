export class UserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UserNotFoundException extends UserException {
  constructor(identifier: string | number) {
    super(`Usuario con identificador '${identifier}' no fue encontrado.`);
  }
}

export class UserAlreadyExistsException extends UserException {
  constructor(email: string) {
    super(`El usuario con el correo '${email}' ya se encuentra registrado.`);
  }
}

export class InvalidUserDataException extends UserException {
  constructor(details: string) {
    super(`Datos de usuario inválidos: ${details}`);
  }
}

export class UserOperationFailedException extends UserException {
  constructor(operation: string, cause?: string | Error) {
    const causeMessage = cause instanceof Error ? cause.message : cause;
    super(
      `La operación '${operation}' en el módulo de usuarios falló${
        causeMessage ? `: ${causeMessage}` : ''
      }.`,
    );
  }
}
