import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';


@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public email!: string;

  @Column({ type: DataType.STRING })
  public passwordHash!: string;

  @Column({ type: DataType.DATE })
  @CreatedAt
  public createdAt: Date = new Date();

  @Column({ type: DataType.DATE })
  @UpdatedAt
  public updatedAt: Date = new Date();

  short() {
    return {
      email: this.email,
    };
  }
}
