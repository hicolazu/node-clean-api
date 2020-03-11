import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

describe('DbAddAccount Usecase', () => {
  const makeSut = (encrypterStub: Encrypter): DbAddAccount => {
    return new DbAddAccount(encrypterStub)
  }

  const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    return new EncrypterStub()
  }

  test('Should call encrypter with correct password', async () => {
    const encrypterStub = makeEncrypterStub()
    const sut = makeSut(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
